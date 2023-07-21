import React,{useState} from "react";
import Header from "../header/header";
import Footer from "../footer/footer";
import { useLocation } from 'react-router-dom';
import axios from "axios"

export default function Bookings(props) {
  // const service = props.location.state
  // console.log(service)
  const location = useLocation();
  const service = location.state;
  const user = localStorage.getItem("userData")
  const consumer_id = JSON.parse(user)._id
  const [date,setDate] = useState("")
  const [time,setTime] = useState("")
  const [note,setNote] = useState("")
  const [address,setAddress] = useState("")
  
  const submitBookinghandler = (e) => {
    e.preventDefault()
    if(address != "" && date != "" && time != ""){
      if(consumer_id && service){
        const booking = {
          consumer_id: consumer_id,
          provider_id: service.vendorID,
          service_id: service._id,
          address: address,
          date: date+" "+time,
          note: note
        }
  
        axios.post("http://localhost:3001/booking/create",booking).then((req,res)=>{
          // if(res){
            window.location.href = "/mybookings"
          // }
        }).catch((e)=>{
          console.log(e)
          alert(e)
        })
  
        // console.log(booking)
      }else {
        alert("Error")
      }
    }else {
      alert("Address, Date and Time are required.")
    }
  }

  return (
    <div>
      <Header currentPage="/booking"/>
      <form
        className="max-w-sm bg-white pt-10 pb-24 m-auto"
      >
        <div class="mx-8">
          <h2 className="text-base font-semibold leading-7 text-xl text-gray-900">
            Service Booking
          </h2>
          <p className="mt-2 text-m leading-6 text-gray-600">{service.serviceName}</p>

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6 w-max">
            <div className="sm:col-span-4 ">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Name
              </label>
              <div className="mt-2 flex rounded-md ring-1 ring-gray-300">
                  <input
                    type="text"
                    name="username"
                    id="username"
                    autoComplete="username"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={service.vendorName}
                    disabled
                  />
              </div>
            </div>

            <div className="sm:col-span-2 sm:col-start-1">
              <label
                htmlFor="date"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Date
              </label>
              <div className="mt-2 flex rounded-md ring-1 ring-gray-300">
                <input
                  type="date"
                  name="date"
                  id="date"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  required
                  value={date}
                  onChange={(e)=>{setDate(e.target.value)}}
                />
              </div>
            </div>

            <div className="sm:col-span-2">
              <label
                htmlFor="time"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Time
              </label>
              <div className="mt-2 flex rounded-md ring-1 ring-gray-300">
                <input
                  type="time"
                  name="time"
                  id="time"
                  required
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={time}
                  onChange={(e)=>{setTime(e.target.value)}}
                />
              </div>
            </div>

            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Address
              </label>
              <div className="mt-2">
                <div className="flex rounded-md ring-1 ring-gray-300">
                  <textarea
                    type="textarea"
                    name="address"
                    id="notes"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={address}
                    onChange={(e)=>{setAddress(e.target.value)}}
                    required
                  />
                </div>
              </div>
            </div>
            <div className="sm:col-span-4">
              <label
                htmlFor="username"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Notes
              </label>
              <div className="mt-2">
                <div className="flex rounded-md ring-1 ring-gray-300">
                  <textarea
                    type="textarea"
                    name="notes"
                    id="notes"
                    className="block flex-1 border-0 bg-transparent py-1.5 pl-3 text-gray-900 placeholder:text-gray-400 focus:ring-0 sm:text-sm sm:leading-6"
                    value={note}
                    onChange={(e)=>{setNote(e.target.value)}}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-center gap-x-6">
            <button
              type="button"
              className="text-sm font-semibold leading-6 text-gray-900"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-md bg-gray-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
              onClick={submitBookinghandler}
            >
              Book
            </button>
          </div>
        </div>
      </form>
      <Footer/>
    </div>
  );
}