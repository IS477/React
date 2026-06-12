function TransformationCard({ transformation }) {
    
    return (

      <div className="transformation-card">
        <img
          src={transformation.image}
          alt={transformation.name}
          className="transformation-img"
        />
  
        <h3>{transformation.name}</h3>
  
        <p>⚡ki: {transformation.ki}</p>
      </div>
    )
  }
  
  export default TransformationCard