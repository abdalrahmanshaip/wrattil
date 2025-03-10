
import { DataTable } from './../components/Pages/home/_components/DataTable';

// مكون الصفحة
const TajweedPage = () => {
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Tajweed Page</h1>
      <DataTable /> {/* استدعاء الجدول هنا */}
    </div>
  );
};

export default TajweedPage;
