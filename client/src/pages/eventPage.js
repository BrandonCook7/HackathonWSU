import gql from 'graphql-tag';
import { useState } from 'react';
import { useQuery } from '@apollo/react-hooks';



function EventPage() {
    const url = window.location.href
    const event_id = url.split(":").pop()

    const GET_EVENT = gql`
    query Query($eventId: ID) {
        findEventByID(event_id: $eventId) {
          name
          created
          requirements
          description
      
          tags {
            category
          }
      
          host {
            username
            email
          }
          
        }
      }
    `

    const [ event, setEvent ] = useState({});
    
    const { loading, error, data } = useQuery(GET_EVENT, {
        onCompleted(data) {
            console.log(data);
            setEvent(data.getEvent);
        },
        variables: { eventId: event_id }
    });


    
    return (
        <div>
            <h1>aaa</h1>
        </div>
    )
}

export default EventPage;