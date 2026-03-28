import AppLayout from '@/Layouts/AppLayout';

export default function Dashboard() {
    return (
        <AppLayout header={<h2 className="text-base-content transition-colors duration-300">Dashboard Logement</h2>}>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                <div className="p-4 rounded shadow transition-colors duration-300">
                    <h3 className="font-bold">Total logements</h3>
                    <p className="text-xl">--</p>
                </div>

                <div className="p-4 rounded shadow transition-colors duration-300">
                    <h3 className="font-bold">Occupés</h3>
                    <p className="text-xl">--</p>
                </div>

                <div className="p-4 rounded shadow transition-colors duration-300">
                    <h3 className="font-bold">Disponibles</h3>
                    <p className="text-xl">--</p>
                </div>

            </div>

        </AppLayout>
    );
}