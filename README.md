# Machine to machine crypto economy based on services and location
Allows:
* easy device discovery
* easy m2m communications
* h2m (human to machine) communications
* m2m & h2m payments

# Concept
* Service device discovery and client-provider commiunication go off-chain
* Payments preferrably go off-chain. Final settlements go on-chain.

## Glossary
(to be filled later)
* Client
* Service provider
* Device discovery
* Request for service
* Offer
* Deal

## Workflow
* A client (human to machine) broadcasts (pub) an off-chain Request for service
* Service providers are subscribed to the channels they an serve (based on location and service)
* Client chooses the best offer based on location, price and other parameters
* Client initiates a deal with the service provider (on-chain or off-chain)
** (Preferred) Client opens a payment channel to the service provider in amount sufficient for the deal
** (Temp) Client uses a smart contract to deposit the amount sufficient for the deal
* The provider delivers/fulfills the service to the client
* The client releases funds (preferrably in small parts depending on the progress - if it can be measured)
* When the service is fully fulfilled the deal is finalised and the funds may be sent to parties (released) or kept for future deals

## Plug'n'play
One of the ideas of the project is to make a device integration into service ecosystem as easy as possible. A device should ideally be preconfigured and ready to serve right after manufacturing.

# Feedback
If you want to support crypto-m2m you can drop some Ether here :-)
`0xbeB0f56FD1Be331Bc8bC5673e5c033233Bd49014`
