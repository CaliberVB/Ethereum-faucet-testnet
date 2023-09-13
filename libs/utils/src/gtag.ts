export const GA_TRACKING_ID = 'G-ESJ377PFJK';

export const pageView = (url: string) => {
  (window as any).gtag('config', GA_TRACKING_ID, {
    page_path: url,
  });
};

export const addGaEvent = ({
  eventName,
  action,
  category,
  label,
  value,
}: {
  eventName: string;
  action: string;
  category: string;
  label: string;
  value: string;
}) => {
  (window as any).gtag('event', eventName, {
    event_category: category,
    event_action: action,
    event_label: label,
    event_value: value,
  });
};
