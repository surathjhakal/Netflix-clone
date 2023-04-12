import React from "react";
import { useState } from "react";
import { useEffect } from "react";
import db from "../firebase";
import { useSelector } from "react-redux";
import { selectUser } from "../features/userSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Spinner } from "react-bootstrap";

const PlansScreen = () => {
  const [products, setProducts] = useState([]);
  const user = useSelector(selectUser);
  const [loadingStripe, setLoadingStripe] = useState("");
  const [subscriptions, setSubscriptions] = useState([]);

  useEffect(() => {
    db.collection("customers")
      .doc(user.uid)
      .collection("subscriptions")
      .get()
      .then((snap) => {
        const tempSubscriptions = [];
        snap.forEach(async (subscription) => {
          tempSubscriptions.push({
            role: subscription.data().role,
            current_period_end: subscription.data().current_period_end.seconds,
          });
        });
        setSubscriptions(tempSubscriptions);
      });
  }, []);

  const checkProductPricesSet = (products) => {
    products.forEach((product) => {
      if (!product.prices) {
        return false;
      }
    });
    return true;
  };

  useEffect(() => {
    db.collection("products")
      .where("active", "==", true)
      .get()
      .then((querySnapshot) => {
        const tempProducts = [];
        let count = 0;
        querySnapshot.forEach(async (doc) => {
          tempProducts.push({
            id: doc.id,
            data: doc.data(),
          });
          const priceSnap = await doc.ref.collection("prices").get();
          priceSnap.docs.forEach((price) => {
            tempProducts[count].prices = {
              priceId: price.id,
              priceData: price.data(),
            };
          });
          count += 1;
        });
        const result = checkProductPricesSet(tempProducts);
        if (result) {
          console.log("main");
          setProducts(tempProducts);
        }
      });
  }, []);

  const loadCheckout = async (product) => {
    setLoadingStripe(product.id);
    const priceId = product.prices.priceId;
    const doc = await db
      .collection("customers")
      .doc(user.uid)
      .collection("checkout_sessions")
      .add({
        price: priceId,
        success_url: window.location.origin,
        cancel_url: window.location.origin,
      });
    doc.onSnapshot(async (snap) => {
      const { error, sessionId } = snap.data();
      if (error) alert("An error occured", error.message);
      if (sessionId) {
        const stripe = await loadStripe(
          "pk_test_51MvRKCSFBkowSPLi6RqoIDD0ZMyRDNum1cAKo4kWQAHgSVCWZzMDHfFXCqBeZwRESqB6MBcVVx7wlVOERCXhVhcp00z3u5exHn"
        );
        setLoadingStripe(false);
        stripe.redirectToCheckout({ sessionId });
      }
    });
  };
  console.log(products);

  return (
    <div className="plansScreen">
      {products.map((product) => {
        const planSubscribed = subscriptions.filter(
          (subs) => subs.role == product.data.role
        );
        const checkSubscribed = planSubscribed.length > 0;
        return (
          <div className="plansScreen_plan" key={product.id}>
            <div className="plansScreen_planName">
              <h1>{product.data.name}</h1>
              <span>{product.data.description}</span>
              <span>
                {checkSubscribed
                  ? "Renewal Date: " +
                    new Date(
                      planSubscribed[0].current_period_end * 1000
                    ).toLocaleDateString()
                  : ""}
              </span>
            </div>
            <button
              onClick={() => !checkSubscribed && loadCheckout(product)}
              style={{ backgroundColor: checkSubscribed && "grey" }}
            >
              {checkSubscribed ? "Current Package" : "Subscribe"}{" "}
              {loadingStripe == product.id && (
                <Spinner
                  animation="border"
                  variant="light"
                  className="loadingStripe"
                />
              )}
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PlansScreen;
