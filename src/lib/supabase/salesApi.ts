import { supabase } from "@/lib/supabase/initSupabase"  
import { Sale, SalesReport } from "@/interfaces/Sales"  
  
export async function getSales(dateFrom?: Date, dateTo?: Date) {  
  let query = supabase.from('sales').select('*')  
    
  if (dateFrom) {  
    query = query.gte('date', dateFrom.toISOString())  
  }  
    
  if (dateTo) {  
    query = query.lte('date', dateTo.toISOString())  
  }  
    
  const { data, error } = await query  
    
  if (error) {  
    console.error('Error fetching sales', error)  
    return []  
  }  
    
  return data as Sale[]  
}  
  
export async function getSalesReport(dateFrom?: Date, dateTo?: Date) {  
  const sales = await getSales(dateFrom, dateTo)  
    
  const totalAmount = sales.reduce((sum, sale) => sum + parseFloat(sale.total.replace('$', '')), 0)  
    
  return {  
    sales,  
    totalAmount: `$${totalAmount.toFixed(2)}`,  
    averageOrderValue: sales.length > 0 ? `$${(totalAmount / sales.length).toFixed(2)}` : '$0.00',  
    totalOrders: sales.length  
  } as SalesReport  
}