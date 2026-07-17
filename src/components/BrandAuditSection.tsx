import DownloadReport from "./DownloadReport";
import FreeAudit from "./FreeAudit";

export default function BrandAuditSection() {
  return (
    <section className="bg-white py-24">
      <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-2">
        <DownloadReport />
        <FreeAudit />
      </div>
    </section>
  );
}