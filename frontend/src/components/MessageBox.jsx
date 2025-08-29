export default function MessageBox({ variant = 'info', children }) {
  return (
    <div className={`alert alert-${variant}`} role='alert'>
      {children}
    </div>
  );
}
