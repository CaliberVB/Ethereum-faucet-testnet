/* eslint-disable react/no-unknown-property */

export const Spinner = () => {
  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '50vh',
      }}
    >
      <div
        style={{
          border: '16px solid #f3f3f3',
          borderRadius: '50%',
          borderTop: '16px solid #3498db',
          width: '60px',
          height: '60px',
          animation: 'spin 2s linear infinite',
        }}
      />
      <style jsx>{`
        @keyframes spin {
          0% {
            transform: rotate(0deg);
          }
          100% {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
};
