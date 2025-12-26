// // components/ModelViewer.tsx
// import dynamic from "next/dynamic";

// const ModelViewer = dynamic(
//   () => import("@google/model-viewer").then(() => () => <model-viewer />),
//   { ssr: false }
// );

// export default function DisplayModelViewer({ src }: { src: string }) {
//   return (
//     <ModelViewer
//       src={src}
//       alt="3D model"
//       auto-rotate
//       camera-controls
//       ar
//       style={{ width: "500px", height: "500px" }}
//     />
//   );
// }
