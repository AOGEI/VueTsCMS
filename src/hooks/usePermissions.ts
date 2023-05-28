import useLoginStore from '@/store/login/login'

function usePermissions(permissionID: string) {
  const loginStore = useLoginStore()
  const { permissions } = loginStore

  //!!=Bolean()
  return !!permissions.find((item) => item.includes(permissionID))
}

export default usePermissions
