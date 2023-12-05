import ReactPrint from 'react-to-print'
import { useRef, useState, useEffect } from 'react';
import Barcode from 'react-barcode';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { Close } from '@mui/icons-material'
import axios from 'axios'
function PdfTemplate(props) {
    const ref = useRef();
    const [openAirPopup, setAirPopup] = useState(false);

    // const [Products, setProducts] = useState([]);

    const [Item, setItem] = useState('');
    const [Quantity ,setQuantity]= useState('');
    const [Amount, setAmount] = useState(0);

    
    const [Discount, setDiscount] = useState(0); // New state for discount percentage

    // const [productName, setProductName] = useState('');
    // const [productAmout, setProductAmount] = useState(0);

    const [total, setTotal ] = useState(0);

    const [List, setList] = useState([]);

    const addData = () => {
        List.push({
            product: Item,
            quantity: Quantity,
            amount: Amount,
        })

        console.log(List);
        setItem('')
        setAmount('')
        setAirPopup(false);
    }

    let sum = 0;
    List.forEach(amount => {
        sum += parseInt(amount.amount)
    
    })
    
    // setTotal(sum)
    console.log(`Sum is = ${sum}`);
   
     
    // Subtract the discount from the total sum
  const discountedTotal = sum - (sum * Discount) / 100;
  
  
  console.log(`Discount total is = ${discountedTotal}`)
  const totals=discountedTotal
  
  
    
    function pushdata(){
        axios.post('http://localhost:5000/register',{totals})
        .then((response)=>{
            const result=response.data
            if(result){
                alert('data pushed')
                setTotal('')
            }
        })
        .catch(()=>{
            alert('data not pushed')
        })
    }
    
    return (
        <>
            <div className="container" ref={ref} >
                <div className="container">
                    <div className="row">
                        <div >
                            <div className="col-md-12">
                                <div className="row">
                                    <div className="col-md-4 brcode">
                                        <Barcode value={`4n%${props.InvoiceNumber}+ut%`} width={1} height={50} displayValue={false} />
                                    </div>
                                    <div className="col-md-8 text-right bbc">
                                        <h4 style={{ color: '#325aa8' }}><strong>KISHOR STORES</strong></h4>
                                        <p>9353235177</p>
                                        <p>kirans@gmail.com</p>
                                        <p>Vijaynagara 2nd Block Opp Sigma Mall Bangalore</p>
                                    </div>
                                </div>
                                <br />
                                <div className="row">
                                    <div className="col-md-12 text-center">
                                        <h2 style={{ color: '#325aa8' }} >INVOICE BILL</h2>
                                        <h5> ID: {props.InvoiceNumber}</h5>
                                    </div>
                                    <div className="col-1">
                                        <h5 style={{ color: '#1E32C7'}}><u>CustamerName:</u><b style={{color:'#000000'}}>{props.CustomerName}</b></h5><br></br>
                                        <h5 style={{ color: '#1E32C7'}}><u>CustamerAddress:</u><b style={{color:'#000000'}}><strong>{props.CustomerAddress}</strong></b></h5>
                                    </div>
                                    <div>
                                        {/* Slot to enter discount percentage */}
                                        <label>
                                        Discount Percentage:
                                        <input
                                            type="number"
                                            value={Discount}
                                            onChange={(e) => setDiscount(e.target.value)}
                                            placeholder="Enter discount percentage"
                                        />
                                        </label>
                                    </div>
                                </div>
                                <br />
                                <div>
                                    <table className="table">
                                        <thead>
                                            <tr>
                                                <th><h5>Products</h5></th>
                                                <th><h5>Quantity</h5></th>
                                                <th><h5>Amount</h5></th>
                                            </tr>
                                           
                                        </thead>
                                        <tbody>
                                            {
                                                List.length?
                                                List.map((items, index) => {
                                                    return (
                                                        <tr key={index} >
                                                            <td className="col-md-9">{items.product}</td>
                                                            <td className="col-md-8">{items.quantity}</td>
                                                            <td className="col-md-3"><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {items.amount}  </td>
                                                        </tr>
                                                    )
                                                }):null
                                            }
                                            <tr>
                                                <td className="text-right">
                                                    <p>
                                                        <strong>Total Amount: </strong>
                                                    </p>
                                                        <strong>Discounted Amount: </strong>
                                                    <p>
                                                        <strong>Payable Amount: </strong>
                                                    </p>
                                                </td>
                                                <td>
                                                    <p>
                                                        <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {sum}</strong>
                                                    </p>
                                                    <p>
                                                        <strong>
                                                            <i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {discountedTotal}
                                                        </strong>
                                                    </p>
                                                    <p>
                                                        <strong><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {discountedTotal}</strong>
                                                    </p>
                                                </td>
                                            </tr>
                                            <tr style={{ color: '#F81D2D' }}>
                                                <td className="text-right"><h4><strong>Total:</strong></h4></td>
                                                <td className="text-left"><h4><strong><i className="fas fa-rupee-sign" area-hidden="true"></i> ₹ {discountedTotal} </strong></h4></td>
                                            </tr>
                                            <button onClick={pushdata}>push</button>
                                        </tbody>
                                    </table>
                                </div>
                                <div>
                                    <div className="col-md-12">
                                        <p><b>Date :</b> {props.date} </p>
                                        <br />
                                        <p><b>KIRAN PROVISION STORES</b></p>
                                        <p><b>Contact:9353235177</b></p>
                                        <p><b>Vijaynagara 2nd Block Opp Sigma Mall Bangalore</b></p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <ReactPrint trigger={() => <button>Print</button>} content={() => ref.current} documentTitle={`INVOICE ${props.InvoiceNumber}`} />

            <button onClick={() => setAirPopup(true)} >Add Items</button>

            

            {/* <Popup openAirPopup={openAirPopup} setAirPopup={setAirPopup} products={Products} setProducts={setProducts} /> */}

            {/* POPUP OPEN */}
            <Dialog open={openAirPopup} >
                <DialogTitle>
                    <div className="title">
                        <div className="hed">New product</div>
                        <div className="icon-cross" onClick={() => setAirPopup(false)} ><Close /></div>
                    </div>
                </DialogTitle>
                <DialogContent>
                    <div className="container">
                        <div className="forms">
                            <input type="text" value={Item} onChange={(e) => setItem(e.target.value)} placeholder='PR Name' />
                            <input type="text" value={Quantity} onChange={(e) => setQuantity(e.target.value)} placeholder='qty' />
                            <input type="text" value={Amount} onChange={(e) => setAmount(e.target.value)} placeholder='Amount ₹' />
                        </div>
                        <div className="buttons">
                            <button onClick={addData} >Add</button>
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
            {/* POPUP CLOSED */}
        </>

    );
}

export default PdfTemplate;