import { Link } from 'react-router-dom';
import { FaQuestionCircle, FaTicketAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import {useState, useEffect, useRef} from 'react';


function Home() {
    const { user } = useSelector((state) => state.auth);
    const [mapReady, setMapReady] = useState(false);
    const containerRef = useRef(null);
      


    return (
        <>
        <div style={{ position: "relative", width: "100vw", height: "100vh" }}>
            <iframe
            src="/gmap.html?lat=21.2793633&long=-157.8323484&tilt=80&heading=180&range=1500&mode=hybrid"           
            style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                height: "100vh",
                border: "none",
                zIndex: 0, // background layer
                // pointerEvents: "none", // make it unclickable!
              }}
            title="3D Google Map"
            />

                {/* <div style={{ position: "relative", zIndex: 1, color: "#fff", padding: "2rem" }}> */}
                    <div style={{position: "absolute",
                        top: "50%",
                        left: "50%",
                        transform: "translate(-50%, -50%)"}}>

                        <div className="max-w-sm rounded shadow-2xl p-10" style={{backdropFilter: "blur(15px)"}}>
                        <div>                      
                            {/* <img
                                alt="Your Company"
                                src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=600"
                                className="mx-auto h-10 w-auto"
                            /> */}
                            <h2 className="text-center text-5xl font-bold tracking-tight text-white tracking-widest font-mono">
                                Hotel
                            </h2>
                            <h2 className="text-center mt-2 text-3xl font-bold tracking-tight text-white tracking-wide font-mono">
                                Booking
                            </h2>
                            </div>

                            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                            <form action="#" method="POST" className="space-y-6">
                                <div>                               
                                <div className="mt-2">
                                    <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    required
                                    placeholder='Email'
                                    autoComplete="email"
                                    className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                    />
                                </div>
                                </div>

                                <div>                                
                                <div className="mt-2">
                                    <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    placeholder='Password'
                                    required
                                    autoComplete="current-password"
                                    className="block w-full rounded-md px-3 py-1.5 text-base text-gray-900 outline-1 -outline-offset-1 outline-gray-300 placeholder:text-gray-400 focus:outline-2 focus:-outline-offset-2 focus:outline-primary sm:text-sm/6"
                                    />
                                </div>
                                </div>

                                <div>
                                <button
                                    type="submit"
                                    className="flex w-full justify-center rounded-md bg-primary px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:bg-primaryHover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary"
                                >
                                    Sign in
                                </button>
                                </div>
                            </form>

                            </div>
                        </div>
                        
                       
                    </div>
                {/* </div> */}
            </div>
            {/* <section className="heading">
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
            </Link> */}
        </>
    );
}

export default Home;
