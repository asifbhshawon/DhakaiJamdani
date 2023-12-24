# DhakaiJamdani

# **The Massive Change**

```js
const Product = () => {
  const { allProducts, loading } = useProductContext();
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  useEffect(() => {
    if (loading) {
      return;
    }
    const foundProduct = allProducts.find((e) => e._id === productId);
    if (foundProduct) {
      setProduct(foundProduct);
    }
  }, [loading, allProducts, productId]);
  return (
    product && (
      <div>
        <Breadcrum product={product} />
        <ProductDisplay product={product} />
        <DescriptionBox />
        <RelatedProducts />
      </div>
    )
  );
};
```

Here we have a loading variable that give us the loading state and when we load the whole data from backend then the product shows up and this is how we solved the problem like `Refreshing the page and vanish data`. 

```js
const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch products from the backend when the component mounts
    axios
      .get("http://localhost:8080/products")
      .then((response) => {
        setAllProducts(response.data);
        setLoading(false);
      })
      .catch((error) => console.error(error));
  }, []);
```
This is how loading variable working.
