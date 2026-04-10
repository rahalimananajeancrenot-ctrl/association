<?php

namespace App\Notifications;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class AttributionNotification extends Notification
{
    use Queueable;

    protected $logement;
    protected $pdfPath;

    /**
     * Create a new notification instance.
     */
    public function __construct($logement, $pdfPath)
    {
        $this->logement = $logement;
        $this->pdfPath = $pdfPath;
    }

    /**
     * Channels
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database']; // 🔥 ajout database
    }

    /**
     * MAIL
     */
    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject('Attribution de logement')
            ->greeting('Bonjour ' . $notifiable->name . ',')
            ->line('Vous avez été attribué à un nouveau logement.')
            ->line('🏠 Logement : ' . $this->logement->name)
            ->line('Veuillez consulter le document PDF pour plus de détails.')
            ->action('Voir le document', url('/storage/' . $this->pdfPath))
            ->line('Merci pour votre confiance.');
    }

    /**
     * DATABASE (notification interne)
     */
    public function toArray(object $notifiable): array
    {
        return [
            'message' => 'Nouveau logement attribué',
            'logement' => $this->logement->name,
            'logement_id' => $this->logement->id,
            'pdf' => $this->pdfPath,
        ];
    }
}