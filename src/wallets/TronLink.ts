interface ITronLink {
  connect: Promise<any>,
  disconnect: Promise<any>
}

export function tronLink():ITronLink {
  const connect = () => {
    try {
      const TRON_WEB = (window as any).tronWeb

      if (TRON_WEB) {
  
      } else {
  
      }
    } catch (err) {
      console.error(err)
    }
  }

  const disconnect = () => {

  }

  export {
    connect,
    disconnect
  }
}