import './Main.css'

export default ({
    children,
    heading
}) => {
    return (
        <div className="contentBox">
            <div className="section">
                <h2 className="sectionHeader">
                    {heading}
                </h2>
                {children}
            </div>
        </div>
    )
}