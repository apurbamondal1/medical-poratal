// import { async } from '@firebase/util';
import { useQuery } from '@tanstack/react-query';
import React, { useContext } from 'react';
// import BookingModal from '../../Appointment/BookingModal/BookingModal';
import { AuthContext } from '../../Context/AuthProvider';

const MyAppointment = () => {
    const {user} = useContext(AuthContext);

const url = `http://localhost:5000/bookings?email=${user?.email}`;
const {data : bookings = []}= useQuery({
    queryKey: ['bookings', user?.email],
    queryFn: async() =>{

        const res = await fetch(url, {
          headers: {
            authorization: `bearer ${localStorage.getItem('accessToken')}`
          }
        });
      // const res = await fetch(url);


        const data = await res.json();
        
        return data;
    }
})

console.log(bookings)
    return (
        <div>
          <h3 className='text-3xl mb-5'>My Apoointments</h3> 
          <div className="overflow-x-auto">
  <table className="table w-full">
    
    <thead>
      <tr>
        <th></th>
        <th>Name</th>
        <th>Treatment</th>
        <th>Date</th>
        <th>Time</th>
      </tr>
    </thead>
    <tbody>
      
      {/* <tr>
        <th>1</th>
        <td>Cy Ganderton</td>
        <td>Quality Control Specialist</td>
        <td>Blue</td>
        <td>Blue</td>
      </tr> */}
      
      
    </tbody>
    {
        bookings?.map((booking, i) =>  <tr key={booking._id}>
            <th>{i+1}</th>
            <td>{booking.patient}</td>
            <td>{booking.treatment}</td>
            <td>{booking.appointmentDate}</td>
            <td>{booking.slot}</td>
          </tr>)
    }
  </table>
</div> 
        </div>
    );
};

export default MyAppointment;
