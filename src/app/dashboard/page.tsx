"use client"

import { Card, CardBody, CardHeader } from "@nextui-org/card"
import { Divider } from "@nextui-org/divider";
import { FiPackage, FiDollarSign, FiShoppingCart  } from "react-icons/fi";

import { Overview } from "@/components/dashboard/home/overview"
import { RecentSales } from "@/components/dashboard/home/recent-sales"
import { CategoryBreakdown } from "@/components/dashboard/home/category-breakdown"

export default function DashboardPage() {
  return (
    <div className="flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <Card>
            <CardBody>
              <div className="flex justify-between items-center">
                <p className="text-sm">Productos Disponibles</p>
                <FiPackage className="h-4 w-4 text-default-400" />
              </div>
              <div className="text-2xl font-bold">1,234</div>
              <p className="text-xs text-default-400">Habilitados y próximamente</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between items-center">
                <p className="text-sm">Productos Vendidos</p>
                <FiShoppingCart className="h-4 w-4 text-default-400" />
              </div>
              <div className="text-2xl font-bold">5,678</div>
              <p className="text-xs text-default-400">+20.1% desde el mes pasado</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between items-center">
                <p className="text-sm">Total Productos</p>
                <FiPackage className="h-4 w-4 text-default-400" />
              </div>
              <div className="text-2xl font-bold">6,912</div>
              <p className="text-xs text-default-400">Disponibles + Vendidos</p>
            </CardBody>
          </Card>
          <Card>
            <CardBody>
              <div className="flex justify-between items-center">
                <p className="text-sm">Total Vendido</p>
                <FiDollarSign className="h-4 w-4 text-default-400" />
              </div>
              <div className="text-2xl font-bold">$45,231.89</div>
              <p className="text-xs text-default-400">+19% desde el mes pasado</p>
            </CardBody>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <h3 className="text-xl font-semibold">Resumen de Ventas</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <Overview />
            </CardBody>
          </Card>
          <Card className="col-span-3">
            <CardHeader>
              <h3 className="text-xl font-semibold">Ventas Recientes</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <RecentSales />
            </CardBody>
          </Card>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
          <Card className="col-span-4">
            <CardHeader>
              <h3 className="text-xl font-semibold">Desglose por Categoría</h3>
            </CardHeader>
            <Divider />
            <CardBody>
              <CategoryBreakdown />
            </CardBody>
          </Card>
        </div>
      </div>
    </div>
  )
}