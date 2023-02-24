import { useQuery } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import BookingModal from '../Appointment/BookingModal/BookingModal';
import AppointmentOption from './AppointmentOption';

const AvailableAppointments = ({ selectedDate }) => {
    // const [appointmentOptions, setAppointmentOptions] = useState([]);
    const [treatment, setTreatment] = useState(null);
    const date = format(selectedDate, 'PP');
    

    // useEffect(() => {
    //     fetch('appointmentOptions.json')
    //         .then(res => res.json())
    //         .then(data => setAppointmentOptions(data))
    // }, [])
    const {data : appointmentOptions = [] ,refetch} = useQuery({
        queryKey:['appointmentOptions' , date],
        queryFn:async() =>{
            const res = await fetch(`http://localhost:5000/appointmentOptions?date=${date}`);
            const data = await res.json();
            return data
        }
    })

    return (
        <section className='my-16'>
            <p className='text-center text-primary font-bold'>Available Appointments on {format(selectedDate, 'PP')}</p>
            <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 mt-6 text-primary'>
                {
                    appointmentOptions.map(option => <AppointmentOption
                        key={option._id}
                        appointmentOption={option}
                        setTreatment={setTreatment}
                    ></AppointmentOption>)
                }
            </div>
            {
                treatment &&
                <BookingModal
                    selectedDate={selectedDate}
                    treatment={treatment}
                    setTreatment={setTreatment}
                    refetch = {refetch}
                ></BookingModal>
            }
        </section>
    );
};

export default AvailableAppointments;