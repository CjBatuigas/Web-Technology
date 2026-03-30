import "../../../assets/styles/Dashboard.css";
import ".../public/AIMS-Banner.png";

// Functional component that displays the dashboard banner
const DashboardBanner = () => {
  return (
    <div className="dashboard-banner">
      <div className="banner-image">
        
        <img src="../public/AIMS-Banner.png"/>
      </div>
    </div>
  );
};

export default DashboardBanner;