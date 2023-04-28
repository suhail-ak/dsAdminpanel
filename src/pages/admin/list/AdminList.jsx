import "./adminList.scss"
import Sidebar from "../../../components/sidebar/Sidebar"
import DashNavbar from "../../../components/navbar/DashNavbar"
import Datatable from "../datatable/Datatable"

const AdminList = () => { 
  return (
    <div className="list">
      <Sidebar/>
      <div className="listContainer">
        <DashNavbar/>
        <Datatable/>
      </div>
    </div>
  )
}

export default AdminList