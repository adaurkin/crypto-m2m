# Service descriptions
The idea of the project is to propose a standard of m2m and h2m interaction based on services.
A client requests a service. Service providers respond with their offers. Then the client selects a provider and arranges the deal (on-chain or off-chain).

## Examples
### Requests for service
```{
    service: "car-charging",
    area: {
        type: "Rectangle",
        coordinates: [[1, 2], [3, 5]]
    },
    demand: 100,
    unit: "kW/h",
    max-price: 0.003,
    currency: "eth"
}```

```{
    service: "passenger-ride",
    start: [1, 2],
    finish: [3, 5],
    max-price: 0.1,
    currency: "eth"
}```

```{
    service: "cargo-transport",
    start: [1, 2],
    finish: [3, 5],
    weight: 200,
    unit: "kg",
    dimensions: [1, 2, 3],
    max-price: 1,
    currency: "eth"
}```

