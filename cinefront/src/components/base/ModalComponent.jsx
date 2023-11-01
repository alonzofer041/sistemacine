import React from "react";
import { Modal,ModalContent, ModalHeader, ModalBody,ModalFooter,useDisclosure, Button } from "@nextui-org/react";
export default function ModalComponent({
    EmitSeccion,
    isOpen,
    onOpenChange,
    onOpen,
    onClose,
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
                                    <Button className="btn-modal" color="danger" variant="light" onPress={onClose}>
                                      Cerrar
                                    </Button>
                                    <Button className="btn-modal" onClick={EventoGuardar} color="primary">
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