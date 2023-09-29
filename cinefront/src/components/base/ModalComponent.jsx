import React from "react";
import { Modal,ModalContent, ModalHeader, ModalBody,ModalFooter,useDisclosure, Button } from "@nextui-org/react";
export default function ModalComponent({
    EmitSeccion,
    isOpen,
    onOpenChange,
    onOpen,
    IdModal,
    Titulo,
    EventoGuardar,
    CuerpoFormulario,
    Size}
    ){
        // const {isOpen, onOpen, onOpenChange} = useDisclosure();
        return(
            <>
                <Modal size={Size} isOpen={isOpen} onOpenChange={onOpenChange}>
                    <ModalContent>
                        {(onClose)=>(
                            <>
                                <ModalHeader className="flex flex-col gap-1">{Titulo}</ModalHeader>
                                <ModalBody>
                                    {CuerpoFormulario}
                                </ModalBody>
                                <ModalFooter>
                                    <Button color="danger" variant="light" onPress={onClose}>
                                      Cerrar
                                    </Button>
                                    <Button onClick={EventoGuardar} color="primary" onPress={onClose}>
                                      Guardar
                                    </Button>
                                </ModalFooter>
                            </>
                        )}
                    </ModalContent>
                </Modal>
            </>
        )
}