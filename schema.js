const userschema = {
    _id: '',
    fullname: 'A name',
    email: 'xxx@xxx.com',
    tag: '@chibykes',
    transname: 'Weeper Transport',
    balance: 200,
    role: 'customer' || 'driver',
    password: 'hash'
}


const transactionschema = {
    _id: '',
    type: 'pay' || 'funding' || 'refunding' || 'withdrawal',
    company: '',
    amount: '',
    from: 'Customer._id' || 'Driver._id',
    to: 'Customer._id' || 'Driver._id'
}


// const 