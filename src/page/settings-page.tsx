import { InfoCardCom } from "@/components/info-card-com";
import { UserProvider } from "@/common/user-context";

export function SettingsPage() {
  const user = UserProvider(); // 获取用户信息

  return (
    <div className="p-10">
      {/* 页面标题 */}
      <div className="text-3xl font-semibold tracking-tight mb-6">
        I want to live for myself · [我想为自己而活。]
      </div>
      <InfoCardCom user={user}>
        {/* 其他部分 */}
        <div className="mt-12 space-y-4">
          {/* 联系方式 */}
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800">联系方式</h3>
            <p className="text-sm text-gray-500 mt-2">
              邮箱: example@example.com
            </p>
          </div>
        </div>

        <div className="mt-12 space-y-4">
          <div className="bg-white shadow-md rounded-xl p-6">
            <h3 className="text-xl font-semibold text-gray-800">其他信息</h3>
            <p className="text-sm text-gray-500 mt-2">更多信息...</p>
          </div>
        </div>
      </InfoCardCom>
    </div>
  );
}
