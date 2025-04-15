import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';



function Home() {
    const { user } = useSelector((state) => state.auth);
    return (
        <>
            <section className="heading">
                <h1>
                {user ? 
                    <>What do you need help with?</> :  <>Hotel B: A Hotel Booking System</>
                }        
                </h1>
                <p>Please choose from an option below</p>
            </section>

            <Link to="/new-ticket" className="btn btn-reverse btn-block">
                <FaQuestionCircle /> 
                {user ? 
                    <>Create New Ticket</> :  <>Create New Booking</>
                }
            </Link>

            <Link to="/tickets" className="btn btn-block">
                <FaTicketAlt /> 
                {user ? 
                    <>View My Ticket</> :  <>View My Booking</>
                }
            </Link>
        </>
    );
}

export default Home;
