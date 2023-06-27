import React from "react";
import { useSelector } from "react-redux";
import EventCard from "../components/Events/EventCard";
import Header from "../components/Layout/Header";
import Footer from "../components/Layout/Footer";
import Loader2 from "../components/Layout/Loader2";

const EventsPage = () => {

  const { allEvents, isLoading } = useSelector((state) => state.events);

  return (
    <>
        <Header activeHeading={4} />
        <br/>
        <br/>
        {/* <br/> */}
        {/* <br/> */}

      {isLoading ? (
        <Loader2/>
        // null
      ) : ( 
        <div>
          <div className="pt-10 pl-14 pr-14">
          <EventCard  active={true} data={allEvents && allEvents[0]} />
          </div>
        </div>
        )
      }
      <br/>
      <br/>
      {/* <br/> */}

      <Footer/>
    </>
  );
}

export default EventsPage

