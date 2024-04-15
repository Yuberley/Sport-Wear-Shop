export default async function DashboardLayout(
    {children}: Readonly<{children: React.ReactNode}>
) {
    return (
        <main>
            {children}
        </main>
    )
}