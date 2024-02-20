export default function Loader({ className = "", children = <></> }) {
  return (
    <div className={`flex-center w-full ${className}`}>
      <span className="loader"></span>
      {children}
    </div>
  );
}
