<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('people', function (Blueprint $table) {
            $table->id();
            $table->unsignedBigInteger('signup_category_id');
            $table->unsignedBigInteger('signup_sub_category_id');
            $table->string('first_name')->nullable();
            $table->string('last_name')->nullable();
            $table->string('sur_name')->nullable();
            $table->string('username')->nullable();
            $table->string('email')->nullable();
            $table->string('identity')->nullable();
            $table->string('full_name')->nullable();
            $table->string('gender')->nullable();
            $table->string('organization_name')->nullable();
            $table->bigInteger('organization_id')->nullable();
            $table->date('dob')->nullable();
            $table->string('profile_image')->nullable();
            $table->string('cover_image')->nullable();
            $table->string('online_profile')->nullable();
            $table->text('interested_in')->nullable();
            $table->text('about_myself')->nullable();
            $table->dateTime('created')->nullable();
            $table->dateTime('updated')->nullable();
            $table->string('facebook')->nullable();
            $table->string('twitter')->nullable();
            $table->string('linkedin')->nullable();
            $table->string('google_plus')->nullable();
            $table->tinyInteger('status')->nullable();
            $table->tinyInteger('is_organization_root_user')->nullable();
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('people');
    }
};
