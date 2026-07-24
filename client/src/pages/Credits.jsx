import React, { useContext,useState,useEffect } from 'react'
import { useAppContext } from '../context/AppContext';
import { dummyPlans } from '../assets/assets';
import Loading from './Loading';

const Credits = () => {
  const {theme} = useAppContext()
  const [plans, setplans] = useState([])
  const [loading, setloading] = useState(true)

  const fetchPlan = async ()=>{
    setplans(dummyPlans)
    setloading(false)
  }
  useEffect(() => {
    fetchPlan()
  }, [])
  useEffect(() => {
      console.log(plans)
  }, [plans])
  
    if (loading) return <Loading />;
  return (
    <div
      className={`min-h-screen flex-1 transition-colors duration-300 p-8 ${
        theme === "dark" ? "bg-[#0f0f0f] text-white" : "bg-gray-50 text-black"
      }`}
    >
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="text-center flex flex-col gap-2">
          <h2 className="text-4xl font-bold">Choose Your Plan</h2>
          <p className={theme === "dark" ? "text-gray-400" : "text-gray-600"}>
            Purchase credits and unlock more AI generations.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {plans.map((plan) => (
            <div
              key={plan._id}
              className={`rounded-2xl border transition-all duration-300 hover:-translate-y-2 hover:shadow-xl ${
                theme === "dark"
                  ? "bg-[#181818] border-gray-700"
                  : "bg-white border-gray-200"
              }`}
            >

              <div className="p-6 flex flex-col gap-6">
                <div className="flex flex-col gap-3">
                  <h3 className="text-2xl font-bold">{plan.name}</h3>

                  <div className="flex items-end gap-2">
                    <span className="text-5xl font-bold">${plan.price}</span>
                    <span
                      className={
                        theme === "dark" ? "text-gray-400" : "text-gray-500"
                      }
                    >
                      USD
                    </span>
                  </div>

                  <span className="w-fit rounded-full bg-purple-500/15 px-3 py-1 text-sm text-purple-500">
                    {plan.credits} Credits
                  </span>
                </div>

                <ul className="flex flex-col gap-3 min-h-40">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-center gap-3">
                      <span className="text-green-500">✔</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>

                <button className="mt-auto rounded-xl bg-purple-600 py-3 font-semibold text-white cursor-pointer transition hover:bg-purple-700">
                  Buy Now
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Credits
