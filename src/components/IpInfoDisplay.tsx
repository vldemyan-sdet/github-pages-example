interface SuccessResponse {
  status: "success";
  country: string;
  countryCode: string;
  region: string;
  regionName: string;
  city: string;
  zip: string;
  lat: number;
  lon: number;
  timezone: string;
  isp: string;
  org: string;
  as: string;
  query: string;
}

interface FailResponse {
  status: "fail";
  message: string;
  query: string;
}

type IpInfo = SuccessResponse | FailResponse;

interface IpInfoDisplayProps {
  info: IpInfo | null;
}

export default function IpInfoDisplay({ info }: IpInfoDisplayProps) {
  if (!info) return null;

  if (info.status === "fail") {
    return (
      <div style={{ marginTop: "10px", background: "#ffe0e0", padding: "10px" }}>
        <strong>❌ Failed to fetch IP info</strong>
        <p><strong>IP:</strong> {info.query}</p>
        <p><strong>Reason:</strong> {info.message}</p>
      </div>
    );
  }

  return (
    <div style={{ marginTop: "10px", background: "#f0f8ff", padding: "10px" }}>
      <h4>🌐 IP Info</h4>
      <ul style={{ listStyle: "none", padding: 0, lineHeight: "1.5" }}>
        <li><strong>IP:</strong> {info.query}</li>
        <li><strong>Country:</strong> {info.country} ({info.countryCode})</li>
        <li><strong>Region:</strong> {info.regionName} ({info.region})</li>
        <li><strong>City:</strong> {info.city}, {info.zip}</li>
        <li><strong>Latitude:</strong> {info.lat}, <strong>Longitude:</strong> {info.lon}</li>
        <li><strong>Timezone:</strong> {info.timezone}</li>
        <li><strong>ISP:</strong> {info.isp}</li>
        <li><strong>Org:</strong> {info.org}</li>
        <li><strong>AS:</strong> {info.as}</li>
      </ul>
    </div>
  );
}
