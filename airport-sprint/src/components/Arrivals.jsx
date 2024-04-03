import Header from "./Header"
import FlightTable from "./FlightTable"

const Arrivals = () => {
    const sampleFlights = [
        { airline: "Provincial Airlines", flightNumber: '43564', date: '2022-01-01', time: '10:00', origin: 'Churchill Falls(ZUM)', destination: "St.John's(YYT)", gateNumber: '3' }, 
        { airline: 'Provincial Airlines', flightNumber: '68543', date: '2022-01-05', time: '9:00', origin: 'Deer Lake(YDF)', destination: "St.John's(YYT)", gateNumber: '1' },
    ]
    
  return (
    <div>
      <Header />
      <FlightTable flights={sampleFlights}/>
      
    </div>
  )
}

export default Arrivals