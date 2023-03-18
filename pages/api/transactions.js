// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default function handler(req, res) {
  // res.status(200).json({ name: 'John Doe' })

  res.json({
    status: 1,
    data: [
      { 
        type: 'debit',
        company: 'Chibykes Global Transport', 
        date: new Date(), 
        amount: 200
      },
      { 
        type: 'credit',
        date: new Date(), 
        amount: 2000
      },
    ]
  });
}
