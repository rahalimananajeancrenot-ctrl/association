<?php

namespace App\Notifications;

use App\Models\Evenements;
use Illuminate\Bus\Queueable;
use Illuminate\Notifications\Notification;

class NewEvenementNotification extends Notification
{
    use Queueable;

    public function __construct(
        public Evenements $evenement
    ) {}

    public function via(object $notifiable): array
    {
        return ['database'];
    }

   public function toDatabase(object $notifiable): array
    {
        return [
            'evenement_id' => $this->evenement->id,
            'title' => $this->evenement->title,
            'description' => $this->evenement->description,
            'image' => $this->evenement->image,
            'shared_by' => $this->evenement->user?->name,
            'created_at' => $this->evenement->created_at?->format('d/m/Y H:i'),
            'url' => route('membre.evenements.index'),
        ];
    }
}