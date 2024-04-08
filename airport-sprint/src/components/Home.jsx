import Header from "./Header"
import Admin from "./Admin"

const Home = () => {
  return (
    <>
    <Header />
    <div className="welcome-container">
      
      <h2 className="welcome-title">
      Welcome to <br/>Mapleview International Airlines</h2>

      <p className="welcome">We're thrilled to have you on board. Whether you're embarking on an adventure or heading back home, we're here to make your journey seamless.<br/> <br/>

      Ready to explore? Navigate effortlessly to our Arrivals and Departures page to plan your next flight or manage your reservations.<br/> <br/>

      Sit back, relax, and let Mapleview International Airlines take you where you need to go.</p>
      
    </div>
    </>
  )
}

export default Home