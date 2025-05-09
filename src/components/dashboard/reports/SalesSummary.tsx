import { Card, CardBody } from "@nextui-org/card"  
import { SalesReport } from "@/interfaces/sales"  
import { Overview } from "@/components/dashboard/home/Overview"  
  
interface SalesSummaryProps {  
  report: SalesReport;  
}  
  
export function SalesSummary({ report }: SalesSummaryProps) {  
  return (  
    <div className="grid gap-4 md:grid-cols-3">  
      <Card shadow="sm">  
        <CardBody>  
          <div className="text-center">  
            <p className="text-sm font-medium">Total Ventas</p>  
            <div className="text-2xl font-bold">{report.totalAmount}</div>  
          </div>  
        </CardBody>  
      </Card>  
        
      <Card shadow="sm">  
        <CardBody>  
          <div className="text-center">  
            <p className="text-sm font-medium">Órdenes</p>  
            <div className="text-2xl font-bold">{report.totalOrders}</div>  
          </div>  
        </CardBody>  
      </Card>  
        
      <Card shadow="sm">  
        <CardBody>  
          <div className="text-center">  
            <p className="text-sm font-medium">Valor Promedio</p>  
            <div className="text-2xl font-bold">{report.averageOrderValue}</div>  
          </div>  
        </CardBody>  
      </Card>  
        
      <Card shadow="sm" className="col-span-3">  
        <CardBody>  
          <Overview />  
        </CardBody>  
      </Card>  
    </div>  
  );  
}