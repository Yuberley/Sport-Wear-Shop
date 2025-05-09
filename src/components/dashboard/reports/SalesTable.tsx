import { Table, TableHeader, TableColumn, TableBody, TableRow, TableCell } from "@nextui-org/table"  
import { Chip } from "@nextui-org/chip"  
import { Sale } from "@/interfaces/sales"  
  
interface SalesTableProps {  
  sales: Sale[];  
}  
  
export function SalesTable({ sales }: SalesTableProps) {  
  return (  
    <Table aria-label="Tabla de ventas">  
      <TableHeader>  
        <TableColumn>ID</TableColumn>  
        <TableColumn>FECHA</TableColumn>  
        <TableColumn>CLIENTE</TableColumn>  
        <TableColumn>TOTAL</TableColumn>  
        <TableColumn>MÉTODO</TableColumn>  
        <TableColumn>ESTADO</TableColumn>  
        <TableColumn>ACCIONES</TableColumn>  
      </TableHeader>  
      <TableBody>  
        {sales.map((sale) => (  
          <TableRow key={sale.id}>  
            <TableCell>{sale.id}</TableCell>  
            <TableCell>{new Date(sale.date).toLocaleDateString()}</TableCell>  
            <TableCell>{sale.customer.name}</TableCell>  
            <TableCell>{sale.total}</TableCell>  
            <TableCell>{sale.paymentMethod}</TableCell>  
            <TableCell>  
              <Chip   
                color={  
                  sale.status === 'completed' ? 'success' :   
                  sale.status === 'pending' ? 'warning' :   
                  'danger'  
                }  
              >  
                {sale.status}  
              </Chip>  
            </TableCell>  
            <TableCell>  
              <button className="text-blue-500 hover:underline">Ver detalle</button>  
            </TableCell>  
          </TableRow>  
        ))}  
      </TableBody>  
    </Table>  
  );  
}