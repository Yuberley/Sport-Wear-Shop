import { Avatar } from "@nextui-org/avatar"

export function RecentSales() {
  return (
    <div className="space-y-8">
      <div className="flex items-center">
        <Avatar src="/avatars/01.png" alt="Olivia Martínez" className="h-9 w-9" />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Olivia Martínez</p>
          <p className="text-sm text-default-400">olivia.martinez@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$1,999.00</div>
      </div>
      <div className="flex items-center">
        <Avatar src="/avatars/02.png" alt="Jackson Lee" className="h-9 w-9" />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Jackson Lee</p>
          <p className="text-sm text-default-400">jackson.lee@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
      <div className="flex items-center">
        <Avatar src="/avatars/03.png" alt="Isabella Nguyen" className="h-9 w-9" />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Isabella Nguyen</p>
          <p className="text-sm text-default-400">isabella.nguyen@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$299.00</div>
      </div>
      <div className="flex items-center">
        <Avatar src="/avatars/04.png" alt="William Kim" className="h-9 w-9" />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">William Kim</p>
          <p className="text-sm text-default-400">william.kim@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$99.00</div>
      </div>
      <div className="flex items-center">
        <Avatar src="/avatars/05.png" alt="Sofia Davis" className="h-9 w-9" />
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">Sofia Davis</p>
          <p className="text-sm text-default-400">sofia.davis@email.com</p>
        </div>
        <div className="ml-auto font-medium">+$39.00</div>
      </div>
    </div>
  )
}

