import Button from '@/components/Button';
import Input from '@/components/Input';
import Head from 'next/head';
import { useState } from 'react';

import Script from 'next/script';
import { GiMoneyStack } from 'react-icons/gi';
import { useRouter } from 'next/router';
import fetchData from '@/hooks/fetchData';



export default function FundWallet() {

  const router = useRouter();
  const [amount, setAmount] = useState();

  function payWithPaystack(e) {
    e.preventDefault();
  
    let handler = PaystackPop.setup({
      key: 'pk_test_1036b2692892ebe21cf87429183177c154984321', // Replace with your public key
      email: 'chibykes99@gmail.com',
      amount: Number(amount) * 100,
      onClose: function(){
        console.log('Window closed.');
      },
      callback: function({reference}){

        handleAddTransaction({
          reference,
          amount
        });

      }
    });
  
    handler.openIframe();
  }

  const handleAddTransaction = async(transaction) => {

    const trx = {
      type: 'funding',
      ...transaction
    }

    localStorage.setItem('ongoing_transc', JSON.stringify(trx));

    const options = {
      method: 'POST',
      body: trx
    }

    const { status, data } = await fetchData('/api/fund-wallet', options);

    if(status === 0){
      return router.push('/login');
    }

    if(status === 2){
      router.push('/success');
    }

  }

  return (
    <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="max-w-md mx-auto h-screen flex flex-col p-4 gap-4 bg-neutral-50">


        <div className='p-3'>
          <p className='text-center font-bold'>Fund Wallet</p>
        </div>

        
        <div className='space-y-3 bg-white'>

          <Input
            name="amount"
            placeholder="Amount to be paid"
            onChange={(e) => setAmount(e.target.value.replace(/[^\d]/ig, ''))}
            value={`₦ ${parseInt(amount||0).toLocaleString()}`}
            required
          />

          <Button
            text="Fund"
            onClick={payWithPaystack}
          />

        </div>
        
      </main>

      <Script
        src="https://js.paystack.co/v1/inline.js"
        strategy="afterInteractive"
      />
    </>
  )
}