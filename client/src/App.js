import React, { Component } from 'react';
import pdfMake from 'pdfmake';
import fs from 'fs';
import logo from './logo.svg';
import './App.css';

class App extends Component {
  paymentReceiptPDF() {
    const docDefinition = {
      pageSize: 'A4',
      pageMargins: [ 30, 40, 30, 40 ],
      content: [
        { text: 'Business Name - RECEIPT', alignment: 'right', fontSize: 20, bold: true },
        {
          columns: [
            {
              table: {
                widths: [ 50, 100 ],
                body: [
                  [
                    {
                      border: [ false ],
                      text: 'Date'
                    },
                    {
                      border: [ true, false, true, true ],
                      alignment: 'center',
                      text: 'MMMM DD, YYYY'
                    }
                  ]
                ]
              }
            },
            {
              table: {
                widths: [ 80, 100 ],
                body: [
                  [
                    {
                      border: [ false ],
                      text: 'Receipt No.'
                    },
                    {
                      border: [ true, false, true, true ],
                      alignment: 'center',
                      text: '0000000001'
                    }
                  ]
                ]
              }
            }
			    ]
		    },
        {
          table: {
            widths: [ 80, 300 ],
            body: [
              [
                {
                  border: [ false ],
                  text: 'Received From'
                },
                {
                  border: [ false, false, false, true ],
                  alignment: 'center',
                  fontSize: 18,
                  text: 'Jose Perez'
                }
              ]
            ]
          }, marginTop: 10
        },
        {
          table: {
            widths: [ 330, 50, 100 ],
            body: [
              [
                {
                  border: [ false, false, false, true ],
                  alignment: 'center',
                  text: 'One Hundred'
                },
                {
                  border: [ false ],
                  text: 'Dollars'
                },
                {
                  alignment: 'center',
                  text: '$ 0,0.00'
                }
              ]
            ]
          }, marginLeft: 15
        },
        {
          table: {
            widths: [ 50, 275 ],
            body: [
              [
                {
                  border: [ false ],
                  text: 'For Rent'
                },
                {
                  border: [ false, false, false, true ],
                  alignment: 'center',
                  text: '815 Bergenline Ave Apt 1'
                },
              ]
            ]
          }
        },
        {
          table: {
            widths: [ 50, 120, 20, 120 ],
            body: [
              [
                {
                  border: [ false ],
                  text: 'Period Of'
                },
                {
                  border: [ false, false, false, true ],
                  alignment: 'center',
                  text: 'MMMM DD'
                },
                {
                  border: [ false ],
                  text: 'To'
                },
                {
                  border: [ false, false, false, true ],
                  alignment: 'center',
                  text: 'MMMM DD'
                }
              ]
            ]
          }
        },
        {
          columns: [
            {
              width: 170,
              table: {
                widths: [ 70, 60 ],
                body: [
                  [
                    {
                      border: [ false ],
                      text: ''
                    },
                    {
                      border: [ false ],
                      text: ''
                    }
                  ],
                  [
                    {
                      text: 'Current Balance'
                    },
                    {
                      alignment: 'center',
                      text: '$ 0,0.00'
                    }
                  ],
                  [
                    {
                      text: 'Payment Amount'
                    },
                    {
                      alignment: 'center',
                      text: '$ 0,0.00'
                    }
                  ],
                  [
                    {
                      text: 'Balance Due'
                    },
                    {
                      alignment: 'center',
                      text: '$ 0.00'
                    }
                  ]
                ]
              }, margin: [ 5, 0, 0, 5 ], fontSize: 8
            },
            {
              width: 90,
              table: {
                widths: [ 6, 48 ],
                body: [
                  [
                    {
                      border: [ false ],
                      text: ''
                    },
                    {
                      border: [ false ],
                      text: ''
                    }
                  ],
                  [
                    {
                      border: [ false ],
                      text: 'X'
                    },
                    {
                      border: [ false ],
                      text: 'Cash'
                    }
                  ],
                  [
                    {
                      border: [ false ],
                      text: ''
                    },
                    {
                      border: [ false ],
                      text: 'Check'
                    }
                  ],
                  [
                    {
                      border: [ false ],
                      text: ''
                    },
                    {
                      border: [ false ],
                      text: 'Money Order'
                    }
                  ]
                ]
              }, fontSize: 8
            },
            {
              table: {
                widths: [ 65, 170 ],
                body: [
                  [
                    {
                      border: [ false ],
                      text: 'Received By'
                    },
                    {
                      border: [ false, false, false, true ],
                      text: ''
                    },
                  ]
                ]
              }, marginTop: 20
            }
			    ]
		    },
        {
          canvas: [
            {
              type: 'line',
              x1: 0, y1: -171,
              x2: 550, y2: -171,
              lineWidth: 1
            },
            {
              type: 'rect',
              x: 0,
              y: -200,
              w: 550,
              h: 200,
              dash: { length: 1 }
            },
            {
              type: 'ellipse',
              x: 178, y: -42,
              r1: 6, r2: 6
				    },
            {
              type: 'ellipse',
              x: 178, y: -28,
              r1: 6, r2: 6
				    },
            {
              type: 'ellipse',
              x: 178, y: -14,
              r1: 6, r2: 6
				    },
            {
              type: 'line',
              x1: 250, y1: -50,
              x2: 250, y2: -5,
              lineWidth: 5
            },
          ]
        }
      ]
    };
    pdfMake.createPdf(docDefinition).open();
  }
  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>Welcome to React</h2>
        </div>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <button onClick={this.paymentReceiptPDF.bind(this)}>Generate PDF</button>
      </div>
    );
  }
}

export default App;
