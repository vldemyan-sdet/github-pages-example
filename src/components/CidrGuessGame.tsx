import { useState, useEffect } from "react";
import IpInfoDisplay from "./IpInfoDisplay";

function getRandomIp(): string {
  return Array(4)
    .fill(0)
    .map(() => Math.floor(Math.random() * 256))
    .join(".");
}

function ipToInt(ip: string): number {
  return ip.split(".").reduce((acc, octet) => (acc << 8) + parseInt(octet), 0);
}

function intToIp(int: number): string {
  return [24, 16, 8, 0].map(shift => (int >> shift) & 255).join(".");
}

function getRandomMask(): number {
  return Math.floor(Math.random() * 23) + 8;
}

function getRandomCidr(ip: string, correct = false, mask?: number): string {
  const intIp = ipToInt(ip);
  const prefix = mask ?? getRandomMask();
  const base = (intIp >> (32 - prefix)) << (32 - prefix);

  const offset = correct
    ? 0
    : (Math.floor(Math.random() * 128) + 1) * 2 * (Math.random() < 0.5 ? 1 : -1);

  return `${intToIp(base + offset)}/${prefix}`;
}

function ipToBinaryString(ip: string): string {
  return ip
    .split(".")
    .map((octet) => parseInt(octet).toString(2).padStart(8, "0"))
    .join(".");
}

function maskToBinaryString(mask: number): string {
  return "1".repeat(mask).padEnd(32, "0").replace(/(.{8})/g, "$1.").slice(0, -1);
}

function intToBinaryIp(int: number): string {
  return [24, 16, 8, 0]
    .map((shift) => ((int >> shift) & 255).toString(2).padStart(8, "0"))
    .join(".");
}

function applyMaskToIp(ip: string, cidrMask: number): string {
  const ipInt = ipToInt(ip);
  const maskInt = ~((1 << (32 - cidrMask)) - 1); // e.g. /24 -> 0xFFFFFF00
  const result = ipInt & maskInt;
  return intToBinaryIp(result);
}

function binaryStringToIp(binary: string): string {
  return binary
    .split(".")                           // split into 4 binary octets
    .map((bin) => parseInt(bin, 2))       // convert each binary to decimal
    .join(".");                           // join into IP string
}


function explain(ip: string, cidr: string): string {
  const ipBinary = ipToBinaryString(ip);
  const maskStr = cidr.split("/")[1];
  const maskInt = parseInt(maskStr, 10);
  const maskBinaryStr = maskToBinaryString(maskInt);
  const maskToIp = applyMaskToIp(ip, maskInt);
  const startIp = binaryStringToIp(maskToIp);

  const explanation = `
IP:         ${ip}
Mask:       ${maskStr}
IP bits:    ${ipBinary}
Mask bits:  ${maskBinaryStr}
IP masked:  ${maskToIp}
IP masked:  ${startIp}
CIDR:       ${startIp}/${maskStr}
`;

  return explanation.trim();
}

export default function CidrGuessGame() {
  const [ip, setIp] = useState("");
  const [cidrs, setCidrs] = useState<string[]>([]);
  const [correctIndex, setCorrectIndex] = useState<number | null>(null);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [ipInfo, setIpInfo] = useState<any>(null);
  const [explanation, setExplanation] = useState<string | null>(null);

  const generateGame = () => {
    const newIp = getRandomIp();
    const mask = getRandomMask();
    const correctCidr = getRandomCidr(newIp, true, mask);
    const choices = [correctCidr];

    while (choices.length < 4) {
      const randomCidr = getRandomCidr(newIp, false, mask);
      if (!choices.includes(randomCidr)) {
        choices.push(randomCidr);
      }
    }

    const shuffled = choices.sort(() => Math.random() - 0.5);
    setIp(newIp);
    setCidrs(shuffled);
    setCorrectIndex(shuffled.indexOf(correctCidr));
    setSelectedIndex(null);
    setIpInfo(null);
    setExplanation(null);
  };

  const loadIpInfo = async () => {
    const res = await fetch(`http://ip-api.com/json/${ip}`);
    const data = await res.json();
    setIpInfo(data);
  };

  const showExplanation = () => {
    if (selectedIndex === null) return;
    const selectedCidr = cidrs[selectedIndex];
    setExplanation(explain(ip, selectedCidr));
  };

  useEffect(() => {
    generateGame();
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
      <h2>Guess the CIDR</h2>
      <p><strong>IP:</strong> {ip}</p>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        {cidrs.map((cidr, index) => {
          const isCorrect = index === correctIndex;
          const isSelected = index === selectedIndex;

          let background = "#eee";
          if (selectedIndex !== null) {
            if (isCorrect) background = "lightgreen";
            if (isSelected && !isCorrect) background = "salmon";
          }

          return (
            <button
              key={cidr}
              onClick={() => setSelectedIndex(index)}
              disabled={selectedIndex !== null}
              style={{
                padding: "10px",
                background,
                border: "1px solid #ccc",
                cursor: selectedIndex === null ? "pointer" : "default",
              }}
            >
              {cidr}
            </button>
          );
        })}
      </div>

      {selectedIndex !== null && (
        <>
          <p>
            {selectedIndex === correctIndex
              ? "✅ Correct!"
              : "❌ Wrong!"}
          </p>
          <button onClick={showExplanation} style={{ marginRight: "10px" }}>
            Show Explanation
          </button>
        </>
      )}

      {explanation && (
        <pre
          style={{
            marginTop: "10px",
            padding: "10px",
            background: "#f0f0f0",
            textAlign: "left",
            whiteSpace: "pre-wrap",
          }}
        >
          {explanation}
        </pre>
      )}

      <div style={{ marginTop: "20px" }}>
        <button onClick={loadIpInfo} style={{ marginRight: "10px" }}>
          Load IP Info
        </button>
        <button onClick={generateGame}>🔄 New Game</button>
      </div>

      {ipInfo && <IpInfoDisplay info={ipInfo} />}
    </div>
  );
}
