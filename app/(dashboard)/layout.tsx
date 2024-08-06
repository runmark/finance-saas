import Header from "@/components/header";

type Props = {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: Props) => {
    return (
        <div>
            <Header />
            <main className="ox-3 lg:px-14">
                {children}
            </main>
        </div>
    );
}

export default DashboardLayout;
