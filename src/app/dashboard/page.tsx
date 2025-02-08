"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { FiPackage, FiDollarSign, FiShoppingCart  } from "react-icons/fi";

import { Overview } from "@/components/dashboard/home/Overview"
import { RecentSales } from "@/components/dashboard/home/RecentSales"
import { CategoryBreakdown } from "@/components/dashboard/home/CategoryBreakdown"


const CardComponent = ({ title, value, subtitle, icon }: { title: string, value: string, subtitle: string, icon: React.ReactNode }) => {
    return (
        <Card shadow="sm" className="p-2">
            <CardBody>
                <div className="flex justify-between items-center mb-3">
                    <p className="text-sm font-medium">{title}</p>
                    {icon}
                    {/* <FiPackage className="h-4 w-4 text-default-400" /> */}
                </div>
                <div className="text-2xl font-bold">{value}</div>
                <p className="text-xs text-default-400">{subtitle}</p>
            </CardBody>
        </Card>
    )
}

export default function DashboardPage() {
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div> 
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <CardComponent 
              title="Productos Disponibles" 
              value="1,234" 
              subtitle="Habilitados y próximamente"
              icon={<FiPackage className="h-4 w-4 text-default-400" />}
            />
          <CardComponent 
              title="Productos Vendidos" 
              value="5,678" 
              subtitle="+20.1% desde el mes pasado"
              icon={<FiShoppingCart className="h-4 w-4 text-default-400" />}
            />
          <CardComponent 
              title="Total Vendido" 
              value="$45,231.89" 
              subtitle="+19% desde el mes pasado"
              icon={<FiDollarSign className="h-4 w-4 text-default-400" />}
            />
          <CardComponent 
              title="Total de Ventas" 
              value="6,912" 
              subtitle="Disponibles + Vendidos"
              icon={<FiPackage className="h-4 w-4 text-default-400" />}
            />
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card shadow="sm" className="col-span-4">
            <CardHeader className="mt-2 ml-2">
              <h3 className="text-xl font-bold">Resumen de Ventas</h3>
            </CardHeader>
            <CardBody>
              <Overview />
            </CardBody>
          </Card>
          <Card shadow="sm" className="col-span-3">
            <CardHeader className="mt-2 ml-2">
              <h3 className="text-xl font-bold">Ventas Recientes</h3>
            </CardHeader>
            <CardBody>
              <RecentSales />
            </CardBody>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card shadow="sm" className="col-span-4">
            <CardHeader className="mt-2 ml-2">
              <h3 className="text-xl font-bold">Desglose por Categoría</h3>
            </CardHeader>
            <CardBody>
              <CategoryBreakdown />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}