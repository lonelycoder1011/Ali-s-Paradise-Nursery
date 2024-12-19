import React, { useState } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
import "./ParadiseNursery.css";
import TotalCost from "./TotalCost";
import { incrementQuantity, decrementQuantity } from "./plantSlice";
import { incrementAvQuantity, decrementAvQuantity } from "./avSlice";
import { incrementsectionthreeQuantity, decrementsectionthreeQuantity } from "./sectionthreeSlice";
import { useSelector, useDispatch } from "react-redux";

const ParadiseNursery = () => {
    const [showItems, setShowItems] = useState(false);
    const [showCartPage, setShowCartPage] = useState(false);
    const plantItems = useSelector((state) => state.plant);
    const avItems = useSelector((state) => state.av);
    const sectionthreeItems = useSelector((state) => state.sectionthree);
    const dispatch = useDispatch();

    // const remainingParadiseNursery = plantItems.find(
    //     (item) => item.name === "Auditorium Hall (Capacity:200)"
    // )?.quantity || 0;

    // function handleAddToCart(index, section) {
    //     const itemsMap = {
    //         av: avItems,
    //         plants: plantItems,
    //         sectionthree: sectionthreeItems
    //     };

    //     const updatedItems = [...itemsMap[section]];

    //     updatedItems[index] = {
    //         ...updatedItems[index],   
    //         inCart: true,              
    //         quantity: 1,              
    //     };

    //     dispatch(updateItems(section, updatedItems));
    // }

    function handleAddToCart(index, section) {
        const itemsMap = {
            av: avItems,
            plants: plantItems,
            sectionthree: sectionthreeItems
        };
    
        const updatedItems = [...itemsMap[section]];
    
        updatedItems[index] = {
            ...updatedItems[index],
            inCart: true,
            quantity: 1,
        };

        dispatch(updateItems(section, updatedItems));
        if (section === "plants") {
            dispatch(incrementQuantity(index));
        } else if (section === "av") {
            dispatch(incrementAvQuantity(index));
        } else if (section === "sectionthree") {
            dispatch(incrementsectionthreeQuantity(index));
        }
    }    

    function handleRemoveFromCart(index, section) {
        const itemsMap = {
            av: avItems,
            plants: plantItems,
            sectionthree: sectionthreeItems
        };
        const updatedItems = [...itemsMap[section]];
        updatedItems[index] = { ...updatedItems[index], inCart: false, quantity: 0 };
        
        dispatch(updateItems(section, updatedItems));
    }

    function handleDecrementQuantity(index, section) {
        const itemsMap = {
            av: avItems,
            plants: plantItems,
            sectionthree: sectionthreeItems
        };
        const updatedItems = [...itemsMap[section]];
        if (updatedItems[index].quantity > 0) {
            updatedItems[index].quantity -= 1;
            if (updatedItems[index].quantity === 0) {
                updatedItems[index].inCart = false;
            }
            dispatch(updateItems(section, updatedItems));
        }
    }

    function handleIncrementQuantity(index, section) {
        const itemsMap = {
            av: avItems,
            plants: plantItems,
            sectionthree: sectionthreeItems
        };
        const updatedItems = [...itemsMap[section]];
        if (updatedItems[index].quantity < 10) {
            updatedItems[index].quantity += 1;
            dispatch(updateItems(section, updatedItems));
        }
    }

    const updateItems = (section, updatedItems) => ({
        type: 'UPDATE_ITEMS',
        payload: { section, updatedItems },
    });    

    const getItemsFromTotalCost = () => {
        const items = [];
        plantItems.forEach((item) => {
            if (item.quantity > 0) {
                items.push({ ...item, type: "plant" });
            }
        });
        avItems.forEach((item) => {
            if (
                item.quantity > 0 &&
                !items.some((i) => i.name === item.name && i.type === "av")
            ) {
                items.push({ ...item, type: "av" });
            }
        });
        sectionthreeItems.forEach((item) => {
            if (
                item.quantity > 0 &&
                !items.some((i) => i.name === item.name && i.type === "sectionthree")
            ) {
                items.push({ ...item, type: "sectionthree" });
            }
        });
        return items;
    };

    const items = getItemsFromTotalCost();

    const ItemDisplay = ({ items }) => {
        return (
            <div className="display_box1">
                {items.length === 0 && <p>No items Selected</p>}
                <table className="table_item_data">
                    <thead>
                        <tr>
                            <th>Name</th>
                            <th>Unit Cost</th>
                            <th>Quantity</th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {items.map((item, index) => (
                            <tr key={index}>
                                <td>{item.name}</td>
                                <td>${item.cost}</td>
                                <td>{item.quantity}</td>
                                <td>${item.cost * item.quantity}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        );
    };

    const calculateTotalCost = (section) => {
        let totalCost = 0;
        if (section === "plant") {
            plantItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "av") {
            avItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            });
        } else if (section === "sectionthree") {
            sectionthreeItems.forEach((item) => {
                totalCost += item.cost * item.quantity;
            })
        }
        return totalCost;
    };

    const plantTotalCost = calculateTotalCost("plant");
    const avTotalCost = calculateTotalCost("av");
    const sectionthreeTotalCost = calculateTotalCost("sectionthree");

    const navigateToProducts = (idType) => {
        const element = document.querySelector(idType);
        if (element) {
            element.scrollIntoView({ behavior: "smooth" });
        }
    };

    const totalCosts = {
        plant: plantTotalCost,
        av: avTotalCost,
        sectionthree: sectionthreeTotalCost,
    };

    const totalCartItems = plantItems.reduce((sum, item) => sum + item.quantity, 0) + avItems.reduce((sum, item) => sum + item.quantity, 0) + sectionthreeItems.reduce((sum, item) => sum + item.quantity, 0);

    const CartPage = () => {

        const totalItems = plantItems.reduce((sum, item) => sum + item.quantity, 0) + avItems.reduce((sum, item) => sum + item.quantity, 0) + sectionthreeItems.reduce((sum, item) => sum + item.quantity, 0);

        const totalCost = plantItems.reduce((sum, item) => sum + item.cost * item.quantity, 0) + avItems.reduce((sum, item) => sum + item.cost * item.quantity, 0) + sectionthreeItems.reduce((sum, item) => sum + item.cost * item.quantity, 0);

        const handleIncrement = (index, type) => {
          if (type === 'plant' && plantItems[index].quantity > 0) {
              dispatch(incrementQuantity(index));
          }
          else if (type === 'av' && avItems[index].quantity > 0) {
              dispatch(incrementAvQuantity(index));
          }
          else if (type === 'sectionthree' && sectionthreeItems[index].quantity > 0) {
              dispatch(incrementsectionthreeQuantity(index)); // Ensure increment logic is correct
          }
        };
      
        const handleDecrement = (index, type) => {
            if (type === 'plant' && plantItems[index].quantity > 0) {
               dispatch(decrementQuantity(index));
            }
            else if (type === 'av' && avItems[index].quantity > 0) {
               dispatch(decrementAvQuantity(index));
            }
            else if (type === 'sectionthree' && sectionthreeItems[index].quantity > 0) {
               dispatch(decrementsectionthreeQuantity(index));
            }
        };      

        const handleDelete = (index, type) => {
            if (type === 'plant') {
                const updatedPlantItems = [...plantItems];
                updatedPlantItems.splice(index, 1);
                dispatch(updateItems('plants', updatedPlantItems));
            } else if (type === 'av') {
                const updatedAvItems = [...avItems];
                updatedAvItems.splice(index, 1); 
                dispatch(updateItems('av', updatedAvItems));
            } else if (type === 'sectionthree') {
                const updatedSectionThreeItems = [...sectionthreeItems];
                updatedSectionThreeItems.splice(index, 1);
                dispatch(updateItems('sectionthree', updatedSectionThreeItems));
            }
        };
        
        // const handleDelete = (index, type) => {
        //     if (type === 'plant') {
        //         const updatedPlantItems = plantItems.filter((item, i) =>
        //             i === index ? { ...item, quantity: 0, inCart: false } : item
        //         );
        //         dispatch(updateItems('plants', updatedPlantItems));
        //     } else if (type === 'av') {
        //         const updatedAvItems = avItems.filter((item, i) =>
        //             i === index ? { ...item, quantity: 0, inCart: false } : item
        //         );
        //         dispatch(updateItems('av', updatedAvItems));
        //     } else if (type === 'sectionthree') {
        //         const updatedSectionThreeItems = sectionthreeItems.filter((item, i) =>
        //             i === index ? { ...item, quantity: 0, inCart: false } : item
        //         );
        //         dispatch(updateItems('sectionthree', updatedSectionThreeItems));
        //     }
        // };
        
        

        return (
          <div className="cart-page">
              <h1>Your Cart</h1>
              <div className="cart-summary">
                  <p>Total Items: {totalItems}</p>
                  <p>Total Cost: ${totalCost}</p>
              </div>
              <div className="cart-items">
                  {plantItems.map((item, index) =>
                      item.quantity > 0 ? (
                          <div className="cart-item" key={index}>
                              <img src={item.img} alt={item.name} className="cart-thumbnail" />
                              <div className="cart-details">
                                  <h2>{item.name}</h2>
                                  <p>Unit Price: ${item.cost}</p>
                                  <p>Quantity: {item.quantity}</p>
                                  <p>Subtotal: ${(item.cost * item.quantity)}</p>
                                  <div className="cart-controls">
                                      <button onClick={() => handleIncrement(index, 'plant')}>+</button>
                                      <button onClick={() => handleDecrement(index, 'plant')} disabled={item.quantity === 0}>
                                          -
                                      </button>
                                      <button onClick={() => handleDelete(index, 'plant')}>Delete</button>
                                  </div>
                              </div>
                          </div>
                      ) : null
                  )}
                  {avItems.map((item, index) =>
                      item.quantity > 0 ? (
                          <div className="cart-item" key={index}>
                              <img src={item.img} alt={item.name} className="cart-thumbnail" />
                              <div className="cart-details">
                                  <h2>{item.name}</h2>
                                  <p>Unit Price: ${item.cost}</p>
                                  <p>Quantity: {item.quantity}</p>
                                  <p>Subtotal: ${(item.cost * item.quantity)}</p>
                                  <div className="cart-controls">
                                      <button onClick={() => handleIncrement(index, 'av')}>+</button>
                                      <button onClick={() => handleDecrement(index, 'av')} disabled={item.quantity === 0}>
                                          -
                                      </button>
                                      <button onClick={() => handleDelete(index, 'av')}>Delete</button>
                                  </div>
                              </div>
                          </div>
                      ) : null
                  )}
                  {sectionthreeItems.map((item, index) =>
                      item.quantity > 0 ? (
                          <div className="cart-item" key={index}>
                              <img src={item.img} alt={item.name} className="cart-thumbnail" />
                              <div className="cart-details">
                                  <h2>{item.name}</h2>
                                  <p>Unit Price: ${item.cost}</p>
                                  <p>Quantity: {item.quantity}</p>
                                  <p>Subtotal: ${(item.cost * item.quantity)}</p>
                                  <div className="cart-controls">
                                      <button onClick={() => handleIncrement(index, 'sectionthree')}>+</button>
                                      <button onClick={() => handleDecrement(index, 'sectionthree')} disabled={item.quantity === 0}>
                                          -
                                      </button>
                                      <button onClick={() => handleDelete(index, 'sectionthree')}>Delete</button>
                                  </div>
                              </div>
                          </div>
                      ) : null
                  )}
              </div>
  
              <div className="cart-actions">
                  <button className="checkout-button" onClick={() => alert("Checkout Coming Soon!")}>
                      Checkout
                  </button>
                  <button className="continue-shopping-button" onClick={() => setShowCartPage(false)}>
                      Continue Shopping
                  </button>
              </div>
          </div>
      );
    };

    return (
        <>
            <nav className="navbar_event_conference">
                <div className="company_logo">Ali's Paradise Nursery</div>
                <div className="cart_icon" onClick={() => setShowCartPage(true)}>
                    <FontAwesomeIcon icon={faCartShopping} className="cart-icon" />
                    <span className="cart_count">{totalCartItems}</span>
                </div>
                <div className="left_navbar">
                    <div className="nav_links">
                        <a href="#venue" onClick={() => navigateToProducts('#plant')}>Air Purifying Plants</a>
                        <a href="#av" onClick={() => navigateToProducts('#av')}>Aromatic Fragrant Plants</a>
                        <a href="#sectionthree" onClick={() => navigateToProducts('#sectionthree')}>Non-Aromatic Flowery Plants</a>
                    </div>
                </div>
            </nav>
    
            <div className="main_container">
                {showCartPage ? (
                    <CartPage />
                ) : (
                    !showItems ? (
                        <div className="items-information">
                            <div id="venue" className="venue_container container_main">
                                <div className="text">
                                    <h1>Air Purifying Plants</h1>
                                </div>
                                <div className="venue_selection">
                                    {plantItems.map((item, index) => (
                                        <div className="venue_main" key={index}>
                                            <div className="img">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                            <div>${item.cost}</div>
                                            <div className="button_container">
                                                {!item.inCart ? (
                                                    <button
                                                        className="btn-primary"
                                                        onClick={() => handleAddToCart(index, 'plants')}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="btn-disabled" disabled>
                                                            Added to Cart
                                                        </button>
                                                        {/* <button
                                                            className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-warning"}
                                                            onClick={() => handleDecrementQuantity(index, 'plants')}
                                                        >
                                                            &#8211;
                                                        </button>
                                                        <span className="selected_count">
                                                            {item.quantity > 0 ? ` ${item.quantity}` : "0"}
                                                        </span>
                                                        <button
                                                            className={item.quantity === 10 ? "btn-success btn-disabled" : "btn-success"}
                                                            onClick={() => handleIncrementQuantity(index, 'plants')}
                                                        >
                                                            &#43;
                                                        </button> */}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Air Purifying Plants Cost: ${plantTotalCost}</div>
                            </div>
    
                            <div id="av" className="venue_container container_main">
                                <div className="text">
                                    <h1>Aromatic Fragrant Plants</h1>
                                </div>
                                <div className="venue_selection">
                                    {avItems.map((item, index) => (
                                        <div className="venue_main" key={index}>
                                            <div className="img">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                            <div>${item.cost}</div>
                                            <div className="button_container">
                                                {!item.inCart ? (
                                                    <button
                                                        className="btn-primary"
                                                        onClick={() => handleAddToCart(index, 'av')}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="btn-disabled" disabled>
                                                            Added to Cart
                                                        </button>
                                                        {/* <button
                                                            className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-warning"}
                                                            onClick={() => handleDecrementAvQuantity(index)}
                                                        >
                                                            &#8211;
                                                        </button>
                                                        <span className="selected_count">
                                                            {item.quantity > 0 ? ` ${item.quantity}` : "0"}
                                                        </span>
                                                        <button
                                                            className={item.quantity === 10 ? "btn-success btn-disabled" : "btn-success"}
                                                            onClick={() => handleIncrementAvQuantity(index)}
                                                        >
                                                            &#43;
                                                        </button> */}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Aromatic Plants Cost: ${avTotalCost}</div>
                            </div>
    
                            <div id="sectionthree" className="venue_container container_main">
                                <div className="text">
                                    <h1>Non-Aromatic Flower Plants</h1>
                                </div>
                                <div className="venue_selection">
                                    {sectionthreeItems.map((item, index) => (
                                        <div className="venue_main" key={index}>
                                            <div className="img">
                                                <img src={item.img} alt={item.name} />
                                            </div>
                                            <div className="text">{item.name}</div>
                                            <div>${item.cost}</div>
                                            <div className="button_container">
                                                {!item.inCart ? (
                                                    <button
                                                        className="btn-primary"
                                                        onClick={() => handleAddToCart(index, 'sectionthree')}
                                                    >
                                                        Add to Cart
                                                    </button>
                                                ) : (
                                                    <>
                                                        <button
                                                            className="btn-disabled" disabled>
                                                            Added to Cart
                                                        </button>
                                                        {/* <button
                                                            className={item.quantity === 0 ? "btn-warning btn-disabled" : "btn-warning"}
                                                            onClick={() => handleDecrementQuantity(index, 'sectionthree')}
                                                        >
                                                            &#8211;
                                                        </button>
                                                        <span className="selected_count">
                                                            {item.quantity > 0 ? ` ${item.quantity}` : "0"}
                                                        </span>
                                                        <button
                                                            className={item.quantity === 10 ? "btn-success btn-disabled" : "btn-success"}
                                                            onClick={() => handleIncrementQuantity(index, 'sectionthree')}
                                                        >
                                                            &#43;
                                                        </button> */}
                                                    </>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div className="total_cost">Total Non-Aromatic Flower Plants Cost: ${sectionthreeTotalCost}</div>
                            </div>
                        </div>
                    ) : (
                        <div className="total_amount_detail">
                            <TotalCost totalCosts={totalCosts} ItemsDisplay={() => <ItemDisplay items={items} />} />
                            <div className="grand_total">Grand Total: ${plantTotalCost + avTotalCost + sectionthreeTotalCost}</div>
                        </div>
                    )
                )}
            </div>
        </>
    );
}    
export default ParadiseNursery;