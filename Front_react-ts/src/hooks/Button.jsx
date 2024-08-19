

export default function Button ({children, isActive, ...props}) {
    
    return (
        <button className={`button ${isActive? 'active' : ''}`} {...props}>
            {children}
        </button>
    )
}