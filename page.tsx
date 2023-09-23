'use client'
import { data } from 'autoprefixer'
import axios from 'axios'
import { Result } from 'postcss'
import './globals.css'
import { useEffect, useState } from 'react'


export default function Home() {
  const [coindata, setcoindata] = useState('')
  useEffect(() => {
    axios.get('https://api.vitrincard.com/api/v1/exchange/symbols?lang=fa&page=1&limit=100').then((Response) =>
      setcoindata(Response.data.result)
    )
    setInterval(() => {
      axios.get('https://api.vitrincard.com/api/v1/exchange/symbols?lang=fa&page=1&limit=100').then((Response) =>
        setcoindata(Response.data.result)
      )


      // axiosGetCall();
    }, 3000);


    // axios.get('https://api.vitrincard.com/api/v1/exchange/symbols?lang=fa&page=1&limit=100').then((Response)=>
    // setcoindata(Response.data.result)
    // )
  }, [])
  //   setInterval(() => {
  //     axiosGetCall();
  // }, 1000);

  return (
    <main className='lg:flex row justify-center  py-8 bg-gray-800'>
      <table className='rounded-full'>
        <tr className="d-block rounded-full rounded-t-lg border-x-2 border-t-2 border-slate-600" >
          <td className='text-slate-500 font-medium mb-5 text-sm text-center px-8 py-7'>نماد</td>
          <td className='text-slate-500 font-medium mb-5 text-sm text-center px-8 py-7'>نام</td>
          <td className='text-slate-500 font-medium mb-5 text-sm text-center px-8 py-7'>خرید</td>
          <td className='text-slate-500 font-medium mb-5 text-sm text-center px-8 py-7'>فروش</td>
          <td className='text-slate-500 font-medium mb-5 text-sm text-center px-8 py-7'>تغییر به درصد	</td>
          <td className='text-slate-500 font-medium mb-5 text-sm text-center px-8 py-7'>تغییر به تومان	</td>
          <td className='text-slate-500 font-medium mb-5 text-sm text-center px-8 py-7'>ترید</td>

        </tr>
        <tbody className='rounded-full'>
          {


            coindata ? coindata.filter((coin: any) => coin.quoteCurrency.name == 'TMN').sort((a: any, b: any) => {
              console.log(a);
              return b.changeRate -a.changeRate
              // return a.baseCurrency.date == 'date'
            }).map((coin: any, key: any) => {
              return (
                <tr key={key} className="border-rounded-full  border-x-2 border-b px-9 pt-5 border-t-2 border-slate-600 " >
                  <td className='px-8 py-7'><img src={'//api.vitrincard.com' + coin.baseCurrency.image} className='w-10 p-1 bg-slate-200 rounded-full' /></td>
                  <td className='px-8 py-7 text-slate-400 text-center text-[14px] font-normal'>{coin.baseCurrency.name}</td>
                  <td className='px-8 py-7 text-slate-400 text-center text-[14px] font-normal'>{coin.buy}</td>
                  <td className='px-8 py-7 text-slate-400 text-center text-[14px] font-normal'>{coin.sell}</td>
                  <td className={coin.changeRate >= 0 ? 'px-8 py-7 text-slate-400 text-center text-[14px] font-normal greenchangeRate ' : 'px-8 py-7 text-slate-400 text-center text-[14px] font-normal redchangeRate'}>{coin.changeRate}</td>
                  <td className={coin.changeRate > 0 ? 'px-8 py-7 text-slate-400 text-center text-[14px] font-normal greenchangePrice' : 'px-8 py-7 text-slate-400 text-center text-[14px] font-normal redchangePrice'}>{coin.changePrice}</td>
                  <td className='px-8 py-7'><a href={'https://panel.vitrincard.com/signin/'} className='btn btn-primary w-10 p-1 bg-slate-200 rounded-full'>خرید</a></td>
                </tr>

              )
            }) : ""}
        </tbody>
      </table>
    </main>
  )
}

