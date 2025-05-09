"use client"  
  
import { Card, CardBody, CardHeader } from "@nextui-org/card"  
import { useState, useEffect } from "react"  
import { Tabs, Tab } from "@nextui-org/tabs"  
import { SalesTable } from "@/components/dashboard/reports/SalesTable"  
import { SalesSummary } from "@/components/dashboard/reports/SalesSummary"  
import { getSalesReport } from "@/lib/supabase/salesApi"  
import { SalesReport } from "@/interfaces/sales"  
  
export default function ReportsPage() {  
  const [dateRange, setDateRange] = useState({ from: null, to: null })  
  const [report, setReport] = useState<SalesReport | null>(null)  
  const [loading, setLoading] = useState(true)  
    
  useEffect(() => {  
    async function loadReport() {  
      setLoading(true)  
      try {  
        const data = await getSalesReport(dateRange.from ? dateRange.from : undefined, dateRange.to ? dateRange.to : undefined)  
        setReport(data)  
      } catch (error) {  
        console.error('Error loading report', error)  
      } finally {  
        setLoading(false)  
      }  
    }  
      
    loadReport()  
  }, [dateRange])  
    
  return (  
    <div className="flex-col md:flex">  
      <div className="flex-1 space-y-4 p-8 pt-6">  
        <div className="flex items-center justify-between space-y-2">  
          <h2 className="text-3xl font-bold tracking-tight">Reportes de Ventas</h2>  
        </div>  
          
        {/* Filtros y contenido como se describió anteriormente */}  
          
        {loading ? (  
          <div>Cargando...</div>  
        ) : report ? (  
          <Tabs aria-label="Options">  
            <Tab key="sales" title="Ventas">  
              <Card shadow="sm">  
                <CardHeader className="pb-0 pt-2 px-4">  
                  <h4 className="font-bold text-large">Detalle de Ventas</h4>  
                </CardHeader>  
                <CardBody>  
                  <SalesTable sales={report.sales} />  
                </CardBody>  
              </Card>  
            </Tab>  
            <Tab key="summary" title="Resumen">  
              <Card shadow="sm">  
                <CardHeader className="pb-0 pt-2 px-4">  
                  <h4 className="font-bold text-large">Resumen de Ventas</h4>  
                </CardHeader>  
                <CardBody>  
                  <SalesSummary report={report} />  
                </CardBody>  
              </Card>  
            </Tab>  
          </Tabs>  
        ) : (  
          <div>No hay datos disponibles</div>  
        )}  
      </div>  
    </div>  
  )  
}



// "use client"  
  
// import { Card, CardBody, CardHeader } from "@nextui-org/card"  
// import { useState } from "react"  
// import { Tabs, Tab } from "@nextui-org/tabs"  
// import { DateRangePicker } from "your-date-picker-component" // Importar o crear un componente de selección de fechas  
  
// export default function ReportsPage() {  
//   const [dateRange, setDateRange] = useState({ from: null, to: null })  
    
//   return (  
//     <div className="flex-col md:flex">  
//       <div className="flex-1 space-y-4 p-8 pt-6">  
//         <div className="flex items-center justify-between space-y-2">  
//           <h2 className="text-3xl font-bold tracking-tight">Reportes de Ventas</h2>  
//         </div>  
          
//         <Card shadow="sm" className="p-4">  
//           <CardHeader className="pb-0 pt-2 px-4 flex-col items-start">  
//             <h4 className="font-bold text-large">Filtros</h4>  
//           </CardHeader>  
//           <CardBody>  
//             <div className="flex flex-wrap gap-4">  
//               <DateRangePicker   
//                 value={dateRange}  
//                 onChange={setDateRange}  
//                 placeholder="Selecciona un rango de fechas"  
//               />  
//               {/* Otros filtros como categoría, etc. */}  
//             </div>  
//           </CardBody>  
//         </Card>  
          
//         <Tabs aria-label="Options">  
//           <Tab key="sales" title="Ventas">  
//             <Card shadow="sm">  
//               <CardHeader className="pb-0 pt-2 px-4">  
//                 <h4 className="font-bold text-large">Detalle de Ventas</h4>  
//               </CardHeader>  
//               <CardBody>  
//                 {/* Tabla de ventas */}  
//                 <SalesTable />  
//               </CardBody>  
//             </Card>  
//           </Tab>  
//           <Tab key="summary" title="Resumen">  
//             <Card shadow="sm">  
//               <CardHeader className="pb-0 pt-2 px-4">  
//                 <h4 className="font-bold text-large">Resumen de Ventas</h4>  
//               </CardHeader>  
//               <CardBody>  
//                 {/* Gráficos y estadísticas */}  
//                 <SalesSummary />  
//               </CardBody>  
//             </Card>  
//           </Tab>  
//         </Tabs>  
//       </div>  
//     </div>  
//   )  
// }  
  
// function SalesTable() {  
//   // Implementación de tabla de ventas  
//   return (  
//     <div>  
//       {/* Tabla con detalles de ventas */}  
//     </div>  
//   )  
// }  
  
// function SalesSummary() {  
//   // Implementación de resumen de ventas con gráficos  
//   return (  
//     <div>  
//       {/* Gráficos y estadísticas */}  
//     </div>  
//   )  
// }