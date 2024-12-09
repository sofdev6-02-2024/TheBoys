'use client'

import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { toast } from "sonner";
import { jwtDecode } from "jwt-decode";
import { decrypt } from "@/app/utils/encryption";

export interface KeycloakUserProfile {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  userImage?: string;
  role: "user" | "Trainer" | "Admin";
}

export interface KeycloakClient {
  id: string;
  clientId: string;
}
interface Role {
  id: string;
  name: string;
}


export function useKeycloakProfile() {
  const { data: session } = useSession();
  const [user, setUser] = useState<KeycloakUserProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEditingImage, setIsEditingImage] = useState(false);
  const [newImageUrl, setNewImageUrl] = useState('');


  useEffect(() => {
    if (session?.access_token) {
      try {
        const decodedToken = jwtDecode<{ sub: string; given_name?: string; family_name?: string; email?: string; userImage?: string; resource_access?: Record<string, { roles: string[] }> }>(decrypt(session.access_token));
        const clientRoles = decodedToken.resource_access?.nextjs?.roles || [];
          console.log("Client-specific roles:", clientRoles);
  
          const role =
            clientRoles.includes("Admin") ? "Admin" :
            clientRoles.includes("Trainer") ? "Trainer" :
            "user";
        setUser({
          id: decodedToken.sub,
          firstName: decodedToken.given_name || '',
          lastName: decodedToken.family_name || '',
          email: decodedToken.email || '',
          userImage: decodedToken.userImage || 'https://t3.ftcdn.net/jpg/06/19/26/46/360_F_619264680_x2PBdGLF54sFe7kTBtAvZnPyXgvaRw0Y.jpg',
          role,
        });
      } catch (error) {
        console.error('Error decoding token:', error);
        toast.error('Error loading user profile');
      } finally {
        setIsLoading(false);
      }
    }
  }, [session]);

  // const handleImageSave = async () => {
  //   if (!user || !session?.access_token) return;

  //   try {
  //     setIsLoading(true);
  //     const response = await fetch(`http://172.17.0.1:8080/admin/realms/body-boost/users/${user.id}`, {
  //       method: 'PUT',
  //       headers: {
  //         'Authorization': `Bearer ${decrypt(session.access_token)}`,
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify({
  //         attributes: {
  //           userImage: newImageUrl
  //         }
  //       })
  //     });

  //     if (!response.ok) throw new Error('Failed to update profile image');

  //     setUser(prev => prev ? {...prev, userImage: newImageUrl} : null);
  //     setIsEditingImage(false);
  //     setNewImageUrl('');
  //     toast.success('Profile image updated successfully');
  //   } catch (error) {
  //     console.error(error);
  //     toast.error('Error updating profile image');
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };


  const handleApplyForTrainer = async (userId: string) => {
    if (!session?.access_token) return;
  
    try {
      setIsLoading(true);
  
      const clientResponse = await fetch('http://172.17.0.1:8080/admin/realms/body-boost/clients', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${decrypt(session.access_token)}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!clientResponse.ok) throw new Error('Failed to fetch clients');
  
      const clients: KeycloakClient[] = await clientResponse.json();
  
      const nextjsClient = clients.find((client: KeycloakClient) => client.clientId === 'nextjs');
  
      if (!nextjsClient) throw new Error('Client "nextjs" not found');
  
      const clientRoleMappingUrl = `http://172.17.0.1:8080/admin/realms/body-boost/clients/${nextjsClient.id}/roles`;
  
      const rolesResponse = await fetch(clientRoleMappingUrl, {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${decrypt(session.access_token)}`,
          'Content-Type': 'application/json',
        },
      });
  
      if (!rolesResponse.ok) throw new Error('Failed to fetch roles for nextjs client');
  
      const roles: Role[] = await rolesResponse.json();
  
      const trainerRole = roles.find(role => role.name === 'Trainer');
      if (trainerRole) {
        const userRoleMappingUrl = `http://172.17.0.1:8080/admin/realms/body-boost/users/${userId}/role-mappings/clients/${nextjsClient.id}`;
  
        const response = await fetch(userRoleMappingUrl, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${decrypt(session.access_token)}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify([{
            id: trainerRole.id,
            name: trainerRole.name,
          }]),
        });
  
        if (!response.ok) throw new Error('Failed to apply for trainer role');
  
        toast.success('Successfully applied for trainer role');
      } else {
        toast.error('Role "Trainer" not found');
      }
    } catch (error) {
      toast.error('Error applying for trainer role');
    } finally {
      setIsLoading(false);
    }
  };
  
  
  

  return {
    isLoading,
    user,
    newImageUrl,
    setNewImageUrl,
    isEditingImage,
    setIsEditingImage,
    //handleImageSave,
    handleApplyForTrainer
  };
}
